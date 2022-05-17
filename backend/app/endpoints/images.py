"""Image API."""
import uuid
from pathlib import Path

from flask import current_app, request
from flask_smorest import Blueprint, abort
from PIL import Image

from app.utils.types import JSON
from app.extensions import db

from app.models import User
from app.serializers import ImageUploadSchema


blueprint = Blueprint(
    "images", "images", url_prefix="/api/images", description="Operations on images"
)

# XXX Giving up on fighting framework to handle incoming file
#     decided to manually grab the file from the request
# @blueprint.arguments(ImageUploadSchema(), location="form")
# def image_upload(upload_data: JSON):

@blueprint.route("/", methods=["POST"])
@blueprint.response(200)
def image_upload():
    file = request.files['file']
    upload_data = dict(file=file, username="Test")  # XXX hardcode
    # check user exists
    username = upload_data.get("username")
    user = User.query.filter_by(username=username).first()
    if not user:
        abort(404, message="User not found.")
    
    # prepare destination for file
    dest = Path(current_app.config.get("LOCAL_IMAGE_DIRECTORY")) / str(user.id)
    if not dest.exists():
        dest.mkdir(parents=True, exist_ok=True)

    # save and rotate image
    file = upload_data.get("file")
    filename = uuid.uuid4()
    img = Image.open(file)
    # TODO use https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.Image.transpose
    img = img.rotate(90)
    img.save(str(dest / f"{filename}.jpg"))

    return