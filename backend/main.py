from fastapi import FastAPI
from routers import cars

app = FastAPI()

app.include_router(cars.router)

@app.get("/")
async def read_main():
    return {"msg": "Hello World"}
