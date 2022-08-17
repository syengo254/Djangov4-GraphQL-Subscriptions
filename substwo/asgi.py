import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

from graphql_ws.django.routing import URLRouter
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'substwo.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

from graphql_ws.django.consumers import GraphQLSubscriptionConsumer

websocket_urlpatterns = [
    path("subscriptions", GraphQLSubscriptionConsumer.as_asgi())
]

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter(websocket_urlpatterns),
})
