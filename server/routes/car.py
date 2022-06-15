from fastapi import APIRouter, Body, status
from fastapi.encoders import jsonable_encoder
from utils.decode import create_aliased_response

from models.cars import (
    add_car
)

from models.cars import (
    add_car
)

from models.schema import (
    CarsSchema,
    ErrorResponseModel,
    ResponseModel,
    UpdateCarsModel
)

carRouter = APIRouter(
    prefix="/car",
    tags=['car']
)

@carRouter.post("/{id}", status_code=status.HTTP_201_CREATED)
async def add_new_car(id: str, car: CarsSchema = Body(...)):
    car = jsonable_encoder(car)
    new_car = await add_car(id, car)

    return ResponseModel(new_car, "Cars data retrieved successfully")
