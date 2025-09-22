"""
Application Root
"""

from flask import Flask

# Configurations
from config.config import PORT, DEBUG_MODE

# Routing
from routes.nav import nav_bp
from routes.auth import auth_bp
from routes.crud import crud_bp


# Application
app = Flask(__name__)


# Routing
app.register_blueprint(nav_bp, url_prefix="/")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(crud_bp, url_prefix="/crud")


@app.errorhandler(404)
def not_found(error):
    return {"message": "Requested resource has been moved or does not exist."}


@app.errorhandler(500)
def server_error(error):
    return {"message": "Internal server error has occurred."}


if __name__ == "__main__":
    app.run(debug=DEBUG_MODE, port=PORT)
