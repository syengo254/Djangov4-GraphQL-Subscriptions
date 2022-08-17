import asyncio

from channels.db import database_sync_to_async

import graphene
from graphene_django import DjangoObjectType

from api.models import Book


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = "__all__"


class BookInput(graphene.InputObjectType):
    name = graphene.String(required=True)



class BookMutation(graphene.Mutation):
    class Arguments:
        data = BookInput(required=True)
    
    newbook = graphene.Field(BookType)

    @classmethod
    def mutate(cls, root, info, data=None):
        book = Book.objects.create(name=data.name)
        return BookMutation(newbook=book)


@database_sync_to_async
def get_books_async():
    return Book.objects.all()

class BookSubscription(graphene.ObjectType):
    books = graphene.List(BookType)        

    async def resolve_books(self, info):
        while True:
            bookslist = await get_books_async()
            yield bookslist
            await asyncio.sleep(1)



class Query(graphene.ObjectType):
    books = graphene.List(BookType)
    book = graphene.Field(BookType, id=graphene.ID(required=True))

    def resolve_books(root, info):
        return Book.objects.all()

    def resolve_book(root, info, id):
        try:
            return Book.objects.get(pk=id)
        except Book.DoesNotExist:
            return None



class Mutation(graphene.ObjectType):
    add_book = BookMutation.Field()



schema = graphene.Schema(query=Query, mutation=Mutation, subscription=BookSubscription)
