"""
Navigation
"""

from flask import Blueprint

nav_bp = Blueprint("nav", __name__)


@nav_bp.route("/", methods=["GET"])
def home():
    return {"message": "HR Tracker"}, 200
