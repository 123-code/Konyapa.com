import pinecone
import time
import openai
import os 
from pinecone_datasets import load_dataset

from langchain_community.document_loaders import UnstructuredURLLoader
urls = ["https://supercoin.it/ec-trading-platform/16585?sorgente=2&gclid=CjwKCAiA1-6sBhAoEiwArqlGPqmVV4qQcyzMIkFQS8BE1bKihdspihpfO9gHTQqHFSTpB0MRjiPDLhoCA0sQAvD_BwE", "https://latam.kaspersky.com/resource-center/definitions/what-is-cryptocurrency", "https://es.wikipedia.org/wiki/Criptomoneda"]
from langchain.schema import Document


loader = UnstructuredURLLoader(urls=urls)
data = loader.load()
documents = [Document(page_content=doc.content, url=doc.url) for doc in data]

pinecone.init(api_key="d51298f1-ea51-4f89-84eb-d7a05e4a730f", environment="us-west1-gcp-free")

pinecone.create_index("quickstart", dimension=8, metric="euclidean")
pinecone.describe_index("quickstart")
index = pinecone.Index("quickstart")


dataset = load_dataset('langchain-python-docs-text-embedding-ada-002')
# we drop sparse_values as they are not needed for this example
dataset.documents.drop(['metadata'], axis=1, inplace=True)
dataset.documents.rename(columns={'blob': 'metadata'}, inplace=True)
dataset.head()
index_name = 'gpt-4-langchain-docs-fast'
# check if index already exists (it shouldn't if this is first time)
if index_name not in pinecone.list_indexes():
    # if does not exist, create index
    pinecone.create_index(
        index_name,
        dimension=1536,  # dimensionality of text-embedding-ada-002
        metric='cosine'
    )
    # wait for index to be initialized
    time.sleep(1)

# connect to index
index = pinecone.GRPCIndex(index_name)
# view index stats
index.describe_index_stats()

for batch in dataset.iter_documents(batch_size=100):
    index.upsert(batch)

openai.api_key = os.getenv('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')

embed_model = "text-embedding-ada-002"