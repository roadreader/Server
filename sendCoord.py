import sys
import os
import json
import requests


if (not os.path.exists('latlng.txt')):
	sys.exit()

with open('latlng.txt', 'r') as file:
    datat = file.read()

lat = datat.split('\n')[0]
lat = datat.split(':')[1]
lat = lat.strip()
lat = lat.split('\n')[0]

lng = datat.split('\n')[1]
lng = lng.split(':')[1]
lng = lng.strip()
lng = lng.split('\n')[0]

lat = float(lat)
lng = float(lng)

print(lat)
print(lng)

feature= {
          "id": "{feature_id}",
          "type": "Feature",
          "properties": {
            "prop0": "value0"
          },
          "geometry": {
            "coordinates": [lng, lat],
            "type": "Point"
          }
        }

with open('feature.json', 'w') as outfile:  
    json.dump(feature, outfile)

headers = {
    'Content-Type': 'application/json',
}

params = (
    ('access_token', 'sk.eyJ1IjoibmFtZGFyMTIiLCJhIjoiY2p1Z2pveXNjMHBraTRmcGphY2xtdXhpayJ9.1emj20Dxb8cN59CixCkdKg'),
)

data = open('feature.json')

response = requests.put('https://api.mapbox.com/datasets/v1/namdar12/cjuglr9en0qxb32o7z1bviwqp/features/%7Bfeature_id%7D', headers=headers, params=params, data=data)


os.remove('latlng.txt')
