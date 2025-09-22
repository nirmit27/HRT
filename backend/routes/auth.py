"""
Authentication and Authorization
"""

from flask import Blueprint


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login")
def login():
    return {"message": "Login route"}


@auth_bp.route("/signup")
def signup():
    return {"message": "Signup route"}


@auth_bp.route("/logout")
def logout():
    return {"message": "Logout route"}
