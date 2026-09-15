import json
import os
from pathlib import Path

from moviepy import (
    VideoFileClip,
    ImageClip,
    AudioFileClip,
    ColorClip,
    CompositeVideoClip,
    CompositeAudioClip,
    concatenate_videoclips
)

# ============================================================
# KASHI FILM BUILDER
# ============================================================

ROOT = Path(__file__).resolve().parent

ASSETS = ROOT / "assets"
VISUALS = ASSETS / "visuals"
NARRATION = ASSETS / "narration"
DIALOGUE = ASSETS / "dialogue"
MUSIC = ASSETS / "music"
AMBIENCE = ASSETS / "ambience"
SFX = ASSETS / "sfx"

OUTPUT = ROOT / "output"

SCENES_FILE = ROOT / "scenes.json"

WIDTH = 3840
HEIGHT = 2160
FPS = 24

OUTPUT.mkdir(exist_ok=True)


# ============================================================
# FILE HELPERS
# ============================================================

def get_file(folder, filename):
    path = folder / filename

    if not path.exists():
        return None

    return path


def load_audio(folder, filename):
    path = get_file(folder, filename)

    if path is None:
        print(f"[AUDIO MISSING] {folder.name}/{filename}")
        return None

    try:
        print(f"[AUDIO] {filename}")
        return AudioFileClip(str(path))
    except Exception as error:
        print(f"[AUDIO ERROR] {filename}: {error}")
        return None


# ============================================================
# VIDEO HELPERS
# ============================================================

def fit_video(clip):
    """
    Fit a video into the 3840x2160 canvas
    without stretching it.
    """

    target_ratio = WIDTH / HEIGHT
    clip_ratio = clip.w / clip.h

    if clip_ratio > target_ratio:
        new_height = HEIGHT
        new_width = int(HEIGHT * clip.w / clip.h)
    else:
        new_width = WIDTH
        new_height = int(WIDTH * clip.h / clip.w)

    clip = clip.resized(
        width=new_width,
        height=new_height
    )

    return clip.with_position(("center", "center"))


def load_visual(filename, duration):
    path = get_file(VISUALS, filename)

    if path is None:
        print(f"[VISUAL MISSING] visuals/{filename}")

        return ColorClip(
            size=(WIDTH, HEIGHT),
            color=(0, 0, 0),
            duration=duration
        )

    try:

        print(f"[VIDEO] {filename}")

        clip = VideoFileClip(str(path))

        if clip.duration < duration:
            print(
                f"[WARNING] {filename} is only "
                f"{clip.duration:.2f}s long; "
                f"requested {duration}s."
            )

        clip = clip.subclipped(
            0,
            min(duration, clip.duration)
        )

        clip = fit_video(clip)

        return clip.with_duration(duration)

    except Exception as error:

        print(f"[VIDEO ERROR] {filename}: {error}")

        return ColorClip(
            size=(WIDTH, HEIGHT),
            color=(0, 0, 0),
            duration=duration
        )


# ============================================================
# SCENE AUDIO
# ============================================================

def collect_scene_audio(scene):

    audio_layers = []

    narration_file = scene.get("narration")

    if narration_file:

        audio = load_audio(
            NARRATION,
            narration_file
        )

        if audio:
            audio_layers.append(
                audio.with_start(0)
            )

    for filename in scene.get("dialogue", []):

        audio = load_audio(
            DIALOGUE,
            filename
        )

        if audio:
            audio_layers.append(
                audio.with_start(0)
            )

    for filename in scene.get("music", []):

        audio = load_audio(
            MUSIC,
            filename
        )

        if audio:

            audio_layers.append(
                audio.with_start(0)
            )

    for filename in scene.get("ambience", []):

        audio = load_audio(
            AMBIENCE,
            filename
        )

        if audio:

            audio_layers.append(
                audio.with_start(0)
            )

    for filename in scene.get("sfx", []):

        audio = load_audio(
            SFX,
            filename
        )

        if audio:

            audio_layers.append(
                audio.with_start(0)
            )

    if not audio_layers:
        return None

    return CompositeAudioClip(audio_layers)


# ============================================================
# BUILD ONE SCENE
# ============================================================

def build_scene(scene):

    scene_id = scene["id"]
    title = scene["title"]

    print()
    print("=" * 70)
    print(f"SCENE {scene_id:02d} — {title}")
    print("=" * 70)

    clips = []

    for shot in scene.get("visuals", []):

        filename = shot["file"]
        duration = float(shot["duration"])

        clip = load_visual(
            filename,
            duration
        )

        clips.append(clip)

    if not clips:

        return ColorClip(
            size=(WIDTH, HEIGHT),
            color=(0, 0, 0),
            duration=1
        )

    video = concatenate_videoclips(
        clips,
        method="compose"
    )

    audio = collect_scene_audio(scene)

    if audio:
        video = video.with_audio(audio)

    print(
        f"Scene {scene_id:02d} assembled: "
        f"{video.duration:.2f}s"
    )

    return video


# ============================================================
# TITLE CARD
# ============================================================

def make_title_card():

    duration = 14

    background = ColorClip(
        size=(WIDTH, HEIGHT),
        color=(0, 0, 0),
        duration=duration
    )

    return background


# ============================================================
# CREDITS
# ============================================================

def make_credits():

    duration = 45

    background = ColorClip(
        size=(WIDTH, HEIGHT),
        color=(0, 0, 0),
        duration=duration
    )

    return background


# ============================================================
# LOAD PROJECT
# ============================================================

def load_project():

    if not SCENES_FILE.exists():

        raise FileNotFoundError(
            "scenes.json was not found."
        )

    with open(
        SCENES_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


# ============================================================
# BUILD COMPLETE FILM
# ============================================================

def build_film():

    print()
    print("==============================================")
    print("KASHI — FILM BUILDER")
    print("==============================================")
    print()

    project = load_project()

    scenes = project["scenes"]

    film_parts = []

    # --------------------------------------------------------
    # 18 SCENES
    # --------------------------------------------------------

    for scene in scenes:

        scene_clip = build_scene(scene)

        film_parts.append(scene_clip)

    # --------------------------------------------------------
    # FINAL TITLE
    # --------------------------------------------------------

    print()
    print("Adding final title...")

    title_card = make_title_card()

    film_parts.append(title_card)

    # --------------------------------------------------------
    # CREDITS
    # --------------------------------------------------------

    print("Adding credits...")

    credits = make_credits()

    film_parts.append(credits)

    # --------------------------------------------------------
    # JOIN FILM
    # --------------------------------------------------------

    print()
    print("Joining all scenes...")

    final_video = concatenate_videoclips(
        film_parts,
        method="compose"
    )

    # --------------------------------------------------------
    # OUTPUT
    # --------------------------------------------------------

    output_file = (
        OUTPUT /
        "KASHI_THE_CITY_THAT_REFUSES_TO_BECOME_THE_PAST.mp4"
    )

    print()
    print("==============================================")
    print("FINAL EXPORT")
    print("==============================================")
    print(f"Resolution : {WIDTH}x{HEIGHT}")
    print(f"FPS        : {FPS}")
    print(f"Duration   : {final_video.duration:.2f}s")
    print(f"Output     : {output_file}")
    print()

    final_video.write_videofile(
        str(output_file),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="30M",
        preset="medium",
        threads=4
    )

    print()
    print("==============================================")
    print("KASHI FILM BUILD COMPLETE")
    print("==============================================")
    print()
    print(output_file)


# ============================================================
# START
# ============================================================

if __name__ == "__main__":

    try:

        build_film()

    except KeyboardInterrupt:

        print()
        print("Build cancelled.")

    except Exception as error:

        print()
        print("BUILD FAILED")
        print()
        print(error)
        print()
