# Cars Trading

### Getting Started
To get started running the project locally, please follow the steps below.

First, clone the repository.
```
git clone https://github.com/jerensl/cars-trading.git
```

Running docker-compose for serve mongodb database
```
docker-compose up

```

Open two terminal, and cd to each frontend and server directory.
For frontend
```
yarn dev
```

For Backend
```
python3 -m uvicorn main:app --reload
```

Then, open the browser with address http://localhost:5000
Go to the Dashboard
Test the application 

### Data Models
1. Brand
- Name
- Logo
- Description
- Cars

1. Cars
- Brand
- Type
- Year
- Price
- Description

### Functional Requirment
1. List of brand
2. Search brand
3. Add a brand
4. Get a brand detail
5. Update brand detail
6. Delete brand detail


### Backend Development

Active A virtual environment for fish shell
```bash
source cars-trade-env/bin/activate.fish
```

Running a Server
```bash
python3 -m uvicorn main:app --reload
```

Running a Test
```bash
python3 -m pytest
```