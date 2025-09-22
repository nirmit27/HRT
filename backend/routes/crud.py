"""
CRUD operations
"""

from flask import Blueprint, jsonify, request

from utils.excel_utils import *


crud_bp = Blueprint("crud", __name__)


initialize_excel()


@crud_bp.route("/create", methods=["POST"])
def create():
    emp_data = request.json
    result = create_employee(emp_data)
    return jsonify(result)


@crud_bp.route("/all", methods=["GET"])
def fetch_all():
    all_records = read_all()
    return jsonify(all_records)


@crud_bp.route("/update", methods=["POST"])
def update():
    details = request.json
    result = update_employee(details[0], details[1])
    return jsonify(result)


@crud_bp.route("/delete/<int:emp_id>", methods=["POST"])
def delete(emp_id):
    result = delete_employee(emp_id)
    return jsonify(result)
