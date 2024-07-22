frappe.ui.form.on("Sales Order Item",{
    item_code: async function(frm, cdt, cdn){
        var data = locals[cdt][cdn]
        if (data.item_code){

            var warehouse_field_names = []
            var warehouse_avl_qtys = []
            await frappe.call({
                method: "imiti.imiti.utils.sales_order.avl_qty_warehouse_wise",
                args:{
                    item_code: data.item_code
                },
                callback(r){
                    
                    warehouse_field_names = r.message[0]
                    warehouse_avl_qtys = r.message[1]
                }
            })
            var row = frm.add_child('custom_available_qty_warehouse_wise');
            row.item_code = data.item_code
            for(var i = 0; i < warehouse_field_names.length; i++){
                frappe.model.set_value(row.doctype, row.name, warehouse_field_names[i], warehouse_avl_qtys[i])
                frm.refresh_field('details');
            }
            
        }
    }
})