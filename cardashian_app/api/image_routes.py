from flask import Blueprint, request
from cardashian_app.models import User, db

bp = Blueprint('images', __name__)
