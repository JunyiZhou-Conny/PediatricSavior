import requests

def get_management_api_token(auth0_domain, client_id, client_secret):
    """
    Obtain an access token for the Auth0 Management API.
    """
    token_url = f"https://{auth0_domain}/oauth/token"
    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "audience": f"https://{auth0_domain}/api/v2/",
        "grant_type": "client_credentials"
    }
    response = requests.post(token_url, json=payload)
    response_data = response.json()
    return response_data.get("access_token")

def fetch_user_data(auth0_domain, user_id, access_token):
    """
    Fetch user data from the Auth0 Management API using the given access token.
    """
    url = f"https://{auth0_domain}/api/v2/users/{user_id}"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching user data: {response.status_code}")
        return None
