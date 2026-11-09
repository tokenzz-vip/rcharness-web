"""Stage only public website files for GitHub Pages (standard library only)."""

from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
DESTINATION = ROOT / "_site"
PUBLIC_FILES = (
    "index.html", "guide.html", "styles.css", "app.js", "CNAME", ".nojekyll",
    "robots.txt", "sitemap.xml",
)

if DESTINATION.exists():
    shutil.rmtree(DESTINATION)
DESTINATION.mkdir()
for name in PUBLIC_FILES:
    shutil.copy2(ROOT / name, DESTINATION / name)
shutil.copytree(ROOT / "assets", DESTINATION / "assets")
shutil.copytree(ROOT / "recommendations", DESTINATION / "recommendations")
print(f"Staged {len(list(DESTINATION.rglob('*')))} entries in {DESTINATION}")
