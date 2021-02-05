## Book Shelf Project Rest API [Backend]

# Categories
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/category | `GET` | Empty | List all categories. |
| /api/category | `POST` | { 'name': 'category example' } | Create a new category. |
| /api/category/:category_id | `GET` | Empty | Get a category. |
| /api/category/:category_id | `PUT` | { 'name': 'update example category' } | Update a category with new info. |
| /api/category/:category_id | `DELETE` | Empty | Delete a category. |

# Books
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/book | `GET` | Empty | List all books. |
| /api/book | `POST` | { 'title': 'example title', 'author': 'example author', 'price': 53, 'stock': 552, 'picture': 'abc.jpeg/jpg/png', 'categoryBy': 'category_id'  } | Create a new book. |
| /api/book/:book_id | `GET` | Empty | Get a book. |
| /api/book/:book_id | `PUT` | { 'title': 'update example title', 'author': 'update  example author', 'price': 54, 'stock': 553, 'picture': 'update-abc.jpeg/jpg/png', 'categoryBy': 'category_id' } | Update a book with new info. |
| /api/book/:book_id | `DELETE` | Empty | Delete a book. |
| /api/books/:category_id | `GET` | Empty | Get all books with their categories. |


