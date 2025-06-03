from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

# Conexão MongoDB ajustada para o Docker
client = MongoClient("mongodb://mongo:27017/")
db = client["marmitafacil"]
estoque_collection = db["estoque"]

app = FastAPI()

class ItemEstoque(BaseModel):
    nome: str
    quantidade: int
    unidade: str

@app.post("/estoque")
def adicionar_item(item: ItemEstoque):
    estoque_collection.insert_one(item.dict())
    return {"message": "Item adicionado ao estoque com sucesso!"}

@app.get("/estoque")
def listar_estoque():
    itens = []
    for doc in estoque_collection.find():
        doc["_id"] = str(doc["_id"])
        itens.append(doc)
    return itens

@app.put("/estoque/{item_id}")
def atualizar_quantidade(item_id: str, quantidade: int):
    result = estoque_collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": {"quantidade": quantidade}}
    )
    if result.modified_count == 1:
        return {"message": "Quantidade atualizada com sucesso!"}
    else:
        raise HTTPException(status_code=404, detail="Item não encontrado.")
