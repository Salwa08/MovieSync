import os
import requests
import django
from django.db.models import Q
import sys


# Set up Django environment
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from videos.models import Actor

TMDB_API_KEY = "83e2caf297a78854343d98e3f0722154"  
BASE_URL = "https://api.themoviedb.org/3"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

def update_actor_images():
    # Get all actors without images
    actors_without_images = Actor.objects.filter(
        Q(Img__isnull=True) | Q(Img='')
    )
    
    print(f"Found {actors_without_images.count()} actors without images")
    
    for actor in actors_without_images:
        search_url = f"{BASE_URL}/search/person"
        params = {
            "api_key": TMDB_API_KEY,
            "query": actor.Name,
            "include_adult": "false"
        }
        
        try:
            response = requests.get(search_url, params=params)
            data = response.json()
            
            if data.get('results') and len(data['results']) > 0:
                person = data['results'][0]
                profile_path = person.get('profile_path')
                
                if profile_path:
                    actor.Img = f"{IMAGE_BASE_URL}{profile_path}"
                    actor.save()
                    print(f"Updated image for {actor.Name}")
                else:
                    print(f"No image found for {actor.Name}")
                    actor.Img = "https://www.nevadahealthcenters.org/wp-content/uploads/2018/09/no-profile-picture.jpg"
                    actor.save()
            else:
                print(f"No results found for {actor.Name}")
                actor.Img = "https://www.nevadahealthcenters.org/wp-content/uploads/2018/09/no-profile-picture.jpg"
                actor.save()
        except Exception as e:
            print(f"Error updating {actor.Name}: {str(e)}")
    
    print("Image update process completed")

if __name__ == "__main__":
    update_actor_images()