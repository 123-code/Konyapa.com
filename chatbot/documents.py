from langchain_community.document_loaders import UnstructuredURLLoader

urls = [
    'https://es.wikipedia.org/wiki/Bitcoin',
    'https://es.wikipedia.org/wiki/Satoshi_Nakamoto',
    'https://es.wikipedia.org/wiki/Peer-to-peer',

]

loaders = UnstructuredURLLoader(urls=urls)

data = loaders.load()

print(data)