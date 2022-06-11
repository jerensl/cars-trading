from fastapi import APIRouter, status

router = APIRouter(
    prefix="/brand",
    tags=['brand']
)

@router.get("/")
async def list_of_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}

@router.get("/{brand}")
async def search_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}

@router.get("/detail/{brand}")
async def get_car_brand_detail():
    return {"Bramd": "BMW", "Description": "......",}

@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_car_brand():
    return 
@router.patch("/")
async def update_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}

@router.delete("/")
async def delete_car_brand():
    return {"Brand": ["BMW", "Daihatsu", "Honda", "Mitsubishi"]}
