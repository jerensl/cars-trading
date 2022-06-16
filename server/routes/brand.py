import os
from fastapi import APIRouter, Body, status, File, UploadFile
from fastapi.encoders import jsonable_encoder
from utils.decode import create_aliased_response

from models.brands import (
    retrieve_brand, 
    update_brand_image,
    add_brand,
    retrieve_brands,
    search_brand,
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
    if new_brand == None:
        return ErrorResponseModel(403, "Brand already exist.")
    return ResponseModel(new_brand, "Brands data retrieved successfully")

@router.post("/uploadimage/{id}", status_code=status.HTTP_201_CREATED)
async def upload_image(id: str, file: UploadFile = File(...)):
    
    allowedFormat = {"image/jpeg", "image/png", "image/gif", "image/tiff", "image/bmp", "video/webm"}
    if file.content_type in allowedFormat:
        contents = await file.read()

        with open(f"images/{file.filename}", "wb") as f:
            f.write(contents)
        
        await update_brand_image(id, "https://localhost:8000/images/"+file.filename)

        return ResponseModel({}, "Images {0} Saved".format(file.filename))

    return ErrorResponseModel(404, "File not allowed.")

@router.get("/")
async def list_of_car_brand():
    brands = await retrieve_brands()
    if brands:
        return ResponseModel(brands, "Brands data retrieved successfully")
    return ResponseModel(brands, "Empty list returned")

@router.get("/{brand}")
async def search_car_brand(brand):
    brand = await search_brand(brand)
    if brand:
        return ResponseModel(brand, "Brand data retrieved successfully")
    return ErrorResponseModel(404, "Brand doesn't exist.")


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
    return ErrorResponseModel(404, "Brand with id {0} doens't exit".format(id))
