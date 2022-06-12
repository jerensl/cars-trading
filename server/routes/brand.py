from fastapi import APIRouter, Body, status, Query
from fastapi.encoders import jsonable_encoder

from models.brands import (
    retrieve_brand, 
    add_brand,
    retrieve_brands,
    delete_brand,
    update_brand
)

from models.schema import (
    BrandsSchema,
    ErrorResponseModel,
    ResponseModel,
    UpdateBrandsModel
)

router = APIRouter(
    prefix="/brand",
    tags=['brand']
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_car_brand(brand: BrandsSchema = Body(...)):
    brand = jsonable_encoder(brand)
    new_brand = await add_brand(brand)
    return ResponseModel(new_brand, "Student added successfully.")

@router.get("/")
async def list_of_car_brand():
    brands = await retrieve_brands()
    if brands:
        return ResponseModel(brands, "Brands data retrieved successfully")
    return ResponseModel(brands, "Empty list returned")

@router.get("/{brand}")
async def search_car_brand():
    brand = await retrieve_brand(id)
    if brand:
        return ResponseModel(brand, "Brand data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Brand doesn't exist.")


@router.put("/{id}")
async def update_car_brand(id: str, req: UpdateBrandsModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_brand = await update_brand(id, req)
    if updated_brand:
        return ResponseModel(
            "Brand with ID: {0}, have been updated".format(id),
            "Brand update successfully"
        )
    return ErrorResponseModel(
        "Something wrong",
        404,
        "Error when update the brand"
    )

@router.delete("/{id}")
async def delete_car_brand():
    deleted_brand = await delete_brand(id)
    if deleted_brand:
        return ResponseModel(
            "Brand with ID: {0} deleted".format(id),
            "Deleted brand successfully"
        )
    return ErrorResponseModel("Something wrong", 404, "Brand with id {0} doens't exit".format(id))
