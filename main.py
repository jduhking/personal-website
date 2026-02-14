from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/home")
async def redirect_home():
    return RedirectResponse(url="/")

@app.get("/about", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})



@app.get("/projects", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("projects.html", {"request": request})



@app.get("/blog", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("blog.html", {"request": request})



@app.get("/games", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("games.html", {"request": request})




