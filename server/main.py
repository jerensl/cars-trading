from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routes import brand

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(brand.router)

@app.get("/")
async def read_main():
    return {"msg": "Hello World"}
