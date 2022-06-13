import requests

resp = requests.post("https://localhost:5000/index", data={'text': 'saya ingin bunuh diri'})

print(resp.text)