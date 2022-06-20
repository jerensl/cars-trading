from fastapi import APIRouter, Body, status
from fastapi.encoders import jsonable_encoder
from utils.decode import create_aliased_response

from models.cars import (
    add_car,
    retrieve_cars
)

from models.schema import (
    CarsSchema,
    ErrorResponseModel,
    ResponseModel,
    ResponseSingleModel,
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

@carRouter.get("/")
async def list_of_car():
    brands = await retrieve_cars()
    if brands:
        return ResponseSingleModel(brands, "Brands data retrieved successfully")
    return ResponseModel(brands, "Empty list returned")
