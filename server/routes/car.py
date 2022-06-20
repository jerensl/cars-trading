from fastapi import APIRouter, Body, status
from fastapi.encoders import jsonable_encoder
from utils.decode import create_aliased_response

from models.cars import (
    add_car,
    retrieve_cars,
    delete_car,
    update_car
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
    cars = await retrieve_cars()
    if cars:
        return ResponseSingleModel(cars, "Car data retrieved successfully")
    return ResponseModel(cars, "Empty list returned")

@carRouter.delete("/{id}")
async def delete_car_brand(id: str):
    deleted_car = await delete_car(id)
    if deleted_car:
        return ResponseModel(
            "Car with ID: {0} deleted".format(id),
            "Deleted car successfully"
        )
    return ErrorResponseModel(404, "Car with id {0} doens't exit".format(id))

@carRouter.put("/{id}")
async def update_car_brand(id: str, req: UpdateCarsModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_car = await update_car(id, req)
    if updated_car:
        return ResponseModel(
            "Car with ID: {0}, have been updated".format(id),
            "Car update successfully"
        )
    return ErrorResponseModel(
        "Something wrong",
        404,
        "Error when update the car")