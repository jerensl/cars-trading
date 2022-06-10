from sys import prefix
from fastapi import APIRouter

router = APIRouter(
    prefix="/cars",
    tags=['cars']
)

@router.get("/")
async def read_cars():
    return [{"cars": "Honda HRV"}, {"Model": "Honda"}]