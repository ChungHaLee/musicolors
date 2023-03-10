import pandas as pd
import json
from IPython.display import display

with open('static/src/data/audio.json') as f:
    js = json.loads(f.read())

df = pd.DataFrame(js)
df.to_excel('breath.xlsx')
display(df)

