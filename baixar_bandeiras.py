import os
import urllib.request
import urllib.error

DESTINO = "assets/flags"
BASE_URL = "https://flagcdn.com/w320"

# nome do arquivo no seu projeto -> código ISO usado pela bandeira
flags = {
    "argelia.png": "dz",
    "argentina.png": "ar",
    "australia.png": "au",
    "austria.png": "at",
    "belgica.png": "be",
    "bosnia-herzegovina.png": "ba",
    "brasil.png": "br",
    "cabo-verde.png": "cv",
    "canada.png": "ca",
    "colombia.png": "co",
    "coreia-do-sul.png": "kr",
    "croacia.png": "hr",
    "curacao.png": "cw",
    "costa-do-marfim.png": "ci",
    "egito.png": "eg",
    "equador.png": "ec",
    "escocia.png": "gb-sct",  # ver observação abaixo
    "espanha.png": "es",
    "estados-unidos.png": "us",
    "franca.png": "fr",
    "gana.png": "gh",
    "haiti.png": "ht",
    "inglaterra.png": "gb-eng",  # ver observação abaixo
    "ira.png": "ir",
    "iraque.png": "iq",
    "japao.png": "jp",
    "jordania.png": "jo",
    "marrocos.png": "ma",
    "mexico.png": "mx",
    "noruega.png": "no",
    "nova-zelandia.png": "nz",
    "paises-baixos.png": "nl",
    "panama.png": "pa",
    "paraguai.png": "py",
    "portugal.png": "pt",
    "qatar.png": "qa",
    "republica-checa.png": "cz",
    "republica-democratica-do-congo.png": "cd",
    "arabia-saudita.png": "sa",
    "senegal.png": "sn",
    "suecia.png": "se",
    "suica.png": "ch",
    "africa-do-sul.png": "za",
    "tunisia.png": "tn",
    "turquia.png": "tr",
    "uruguai.png": "uy",
    "uzbequistao.png": "uz"
}

os.makedirs(DESTINO, exist_ok=True)

def baixar(url, caminho):
    try:
        urllib.request.urlretrieve(url, caminho)
        print(f"OK  -> {caminho}")
        return True
    except urllib.error.HTTPError as e:
        print(f"ERRO HTTP {e.code} ao baixar {url}")
    except Exception as e:
        print(f"ERRO ao baixar {url}: {e}")
    return False

for arquivo, codigo in flags.items():
    caminho = os.path.join(DESTINO, arquivo)
    url = f"{BASE_URL}/{codigo}.png"
    baixar(url, caminho)

print("\nDownload finalizado.")
print(f"As bandeiras foram salvas em: {DESTINO}")