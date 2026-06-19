"""Convert factory source photos into optimized application page webp assets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE_DIR = REPO_ROOT / "factory"
OUTPUT_DIR = REPO_ROOT / "my-app" / "public" / "images" / "applications"

# slug -> (source filename prefix, crop ratio, max width)
APPLICATION_MAPPING = {
    "hero": ("24_", 16 / 9, 1920),
    "school-cafeteria": ("15_", 4 / 3, 1200),
    "hotel-kitchen": ("09_", 4 / 3, 1200),
    "chain-restaurant": ("06_", 4 / 3, 1200),
    "central-kitchen": ("13_", 4 / 3, 1200),
}

MAX_SIZE_KB = 300
INITIAL_QUALITY = 82


def normalize_orientation(image: Image.Image) -> Image.Image:
    try:
        image = ImageOps.exif_transpose(image)
    except Exception:
        pass
    return image


def crop_to_ratio(image: Image.Image, ratio: float) -> Image.Image:
    width, height = image.size
    current_ratio = width / height
    if current_ratio > ratio:
        new_width = int(height * ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = int(width / ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def resolve_source(prefix: str) -> Path:
    matches = sorted(SOURCE_DIR.glob(f"{prefix}*.jpg"))
    if not matches:
        raise FileNotFoundError(f"No source image found for prefix: {prefix}")
    return matches[0]


def save_under_size(image: Image.Image, target: Path) -> tuple[int, int]:
    target.parent.mkdir(parents=True, exist_ok=True)
    quality = INITIAL_QUALITY

    while quality >= 50:
        image.save(target, format="WEBP", quality=quality, method=6)
        size_kb = target.stat().st_size / 1024
        if size_kb <= MAX_SIZE_KB:
            return int(size_kb * 1024), quality

        if image.width > 900:
            ratio = 0.85
            size = (max(900, int(image.width * ratio)), max(1, int(image.height * ratio)))
            image = image.resize(size, Image.Resampling.LANCZOS)
            quality = INITIAL_QUALITY
            continue

        quality -= 6

    return target.stat().st_size, quality


def convert_image(slug: str, prefix: str, ratio: float, max_width: int) -> None:
    source = resolve_source(prefix)
    target = OUTPUT_DIR / f"{slug}.webp"

    with Image.open(source) as raw:
        image = crop_to_ratio(normalize_orientation(raw.convert("RGB")), ratio)
        if image.width > max_width:
            scale = max_width / image.width
            size = (max_width, max(1, round(image.height * scale)))
            image = image.resize(size, Image.Resampling.LANCZOS)

    size_bytes, quality = save_under_size(image, target)
    size_kb = round(size_bytes / 1024, 1)
    print(f"{source.name} -> {target.name} ({size_kb} KB, quality={quality})")


def main() -> None:
    for slug, (prefix, ratio, max_width) in APPLICATION_MAPPING.items():
        convert_image(slug, prefix, ratio, max_width)
    print(f"Done. Application images saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()