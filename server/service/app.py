from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routes.brand import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def read_main():
    return {"msg": "Hello World"}
