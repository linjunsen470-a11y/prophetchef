"""Convert source factory JPGs to optimized webp assets for the Next.js app."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCE_DIR = REPO_ROOT / "factory"
OUTPUT_DIR = REPO_ROOT / "my-app" / "public" / "images" / "factory"

MAPPING = {
    "01_厂区外景_办公楼与车间通道1.jpg": "exterior-office-workshop-corridor-01.webp",
    "02_厂区外景_办公楼与车间通道2.jpg": "exterior-office-workshop-corridor-02.webp",
    "03_厂区外景_车间主干道.jpg": "exterior-workshop-main-road.webp",
    "04_展厅_商用电磁炉及整体厨房设备.jpg": "showroom-induction-integrated-kitchen.webp",
    "05_展厅_自动快餐与油炸设备区.jpg": "showroom-fast-food-fryer-zone.webp",
    "06_展厅_自动炒菜机与商用炉具区.jpg": "showroom-auto-cooking-commercial-ranges.webp",
    "07_展厅_商用大锅灶与烘焙设备区.jpg": "showroom-wok-baking-equipment.webp",
    "08_展厅_智能厨房设备及自动升降煮面炉.jpg": "showroom-smart-kitchen-noodle-cooker.webp",
    "09_展厅_高端一体化商用岛炉展示.jpg": "showroom-premium-island-range.webp",
    "10_展厅_日式铁板烧设备展示.jpg": "showroom-teppanyaki-equipment.webp",
    "11_展厅_排炉设备与合作客户logo墙.jpg": "showroom-range-line-client-logo-wall.webp",
    "12_展厅_智能明档开放式厨房示范区.jpg": "showroom-open-kitchen-demo-zone.webp",
    "13_展厅_后厨标准备餐区不锈钢工作台.jpg": "showroom-prep-station-workbench.webp",
    "14_展厅_标准后厨清洗与刀具消毒区.jpg": "showroom-cleaning-sanitation-zone.webp",
    "15_展厅_自动化快餐生产线传送带设备.jpg": "showroom-conveyor-fast-food-line.webp",
    "16_车间_电磁炉核心部件组装与焊接.jpg": "workshop-induction-assembly-welding.webp",
    "17_车间_五金冲压与钣金加工区.jpg": "workshop-sheet-metal-stamping.webp",
    "18_车间_数控自动折弯机操作.jpg": "workshop-cnc-bending.webp",
    "19_车间_商用洗碗机组装与接线.jpg": "workshop-dishwasher-assembly.webp",
    "20_车间_风机与重型商用厨电组装.jpg": "workshop-heavy-equipment-assembly.webp",
    "21_车间_揭盖式洗碗机焊接与装配.jpg": "workshop-hood-dishwasher-assembly.webp",
    "22_车间_金属工件精密焊接与打磨.jpg": "workshop-precision-welding-polishing.webp",
    "23_车间_炉具与洗碗机焊接抛光车间.jpg": "workshop-range-dishwasher-polishing.webp",
    "24_实景_商用智能厨房滚筒炒锅与蒸饭柜.jpg": "installation-drum-wok-rice-steamer.webp",
    "25_实景_商用智能厨房全自动肠粉机与煮面机.jpg": "installation-rice-roll-noodle-machines.webp",
}

MAX_WIDTH = 1920
QUALITY = 82


def normalize_orientation(image: Image.Image) -> Image.Image:
    try:
        image = ImageOps.exif_transpose(image)
    except Exception:
        pass
    return image


def crop_to_landscape(image: Image.Image, ratio: float = 16 / 9) -> Image.Image:
    width, height = image.size
    current_ratio = width / height
    if current_ratio > ratio:
        new_width = int(height * ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = int(width / ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def convert_image(source: Path, target: Path) -> None:
    with Image.open(source) as image:
        image = crop_to_landscape(normalize_orientation(image.convert("RGB")))
        if image.width > MAX_WIDTH:
            ratio = MAX_WIDTH / image.width
            size = (MAX_WIDTH, round(image.height * ratio))
            image = image.resize(size, Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, format="WEBP", quality=QUALITY, method=6)


def main() -> None:
    converted = 0
    for source_name, target_name in MAPPING.items():
        source = SOURCE_DIR / source_name
        target = OUTPUT_DIR / target_name
        if not source.exists():
            raise FileNotFoundError(f"Missing source image: {source}")
        convert_image(source, target)
        converted += 1
        print(f"Converted {source_name} -> {target_name}")

    print(f"Done. Converted {converted} images into {OUTPUT_DIR}")


if __name__ == "__main__":
    main()