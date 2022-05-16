from functools import wraps

# from flask import request
# from flask_smorest import abort


# def authenticate(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         auth_header = request.headers.get("Authorization")
#         if not auth_header:
#             raise abort(401, message="Authorization header is missing.")
#         scheme, _, user_id = auth_header.partition(" ")
#         if not user_id:
#             raise abort(401, message="Something went wrong.")
#         return f(user_id, *args, **kwargs)
#     return decorated_function