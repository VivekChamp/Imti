import frappe

@frappe.whitelist()
def avl_qty_warehouse_wise(item_code):
    
    warehouses = {
        "warehouse_1": "Stores - VPSBS",
        "warehouse_2": "Stores - VPSBS",
        "warehouse_3": "Stores - VPSBS",
        "warehouse_4": "Stores - VPSBS",
        "warehouse_5": "Stores - VPSBS",
    }

    warehouse_avl_qtys = []

    warehouse_field_names = list(warehouses.keys())
    warehouse_names = list(warehouses.values())

    for warehouse_name in warehouse_names:

        warehouse_avl_qtys.append(frappe.get_value("Bin", {"item_code": item_code, "warehouse": warehouse_name}, "actual_qty") or 0)

    return warehouse_field_names, warehouse_avl_qtys