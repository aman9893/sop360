const registercontrollerObj = require('../controllers/registercontroller');
const logincontrollerObj = require('../controllers/login');
const LeadManagementObj=require('../controllers/lead-management/lead');
const stockManagementObj=require('../controllers/stock-management/stock-item');
const contactBook =require('../controllers/contact-book/contact')
const TaskTodo =require('../controllers/todo-management/todo')
const admin =require('../controllers/admin-role/role')
const KhataBook =require('../controllers/khata-book/khata')
const billData =require('../controllers/bill-data/bill')
const messageData =require('../controllers/bulkmessage/message')



const express = require('express')
const router =  express.Router();


/*--------------------------------------------dashboard api-----------------------*/
router.post('/api/sendBulkMessage', messageData.sendBulkMessage);


router.post('/api/login', logincontrollerObj.authenticate);
router.post('/api/register', registercontrollerObj.register);
router.post('/api/forgetpassword', logincontrollerObj.forgetPassword);
router.get('/api/user_register_info/:id', registercontrollerObj.UaserListById);
router.get('/api/get_admin_profile/:id', admin.getUserProfile);
router.put('/api/update_trial_days', logincontrollerObj.UpdatePaymentUserDays);
router.post('/api/UpdatePassword', logincontrollerObj.UpdatePassword);

router.get('/api/getAllusers', registercontrollerObj.AllUaserList);
router.put('/api/upate_user', registercontrollerObj.upateUser);

/*------------------------- Lead Management -----------------------------*/

router.post('/api/add_lead', LeadManagementObj.addLead);
router.get('/api/get_lead', LeadManagementObj.LeadInfoList);
router.put('/api/update_lead', LeadManagementObj.UpdateLeadInfo);
router.delete('/api/delete_lead_list/:id', LeadManagementObj.deleteLeadList);
router.get('/api/lead_listBy_id/:lead_id', LeadManagementObj.LeadListByid);


/*------------------------- stock Management -----------------------------*/

 router.post('/api/add_stock_item', stockManagementObj.addStockManagement);
 router.get('/api/get_stock_item', stockManagementObj.StockManagementInfoList);
 router.put('/api/update_stock_item_Id', stockManagementObj.updateStockList);
 router.put('/api/update_stock_item_list', stockManagementObj.UpdateStockInfoData);
 router.delete('/api/delete_stock_item/:id', stockManagementObj.deleteStockManagement);
 router.post('/api/update_stockitem', stockManagementObj.UpdateStockItem)

//////----------------------contact----------------

router.get('/api/contactbook_list', contactBook.contactBooklistData);
router.post('/api/add_contactbook', contactBook.addcontactBook);
router.delete('/api/delete_contact/:contact_id', contactBook.deleteContactData);
router.put('/api/update_contact_list', contactBook.UpdateConatctData);
//------------------todo------------------------------------

router.get('/api/todo_task_list/:role_id', TaskTodo.TaskTodolistData);
router.post('/api/add_todo_list', TaskTodo.addTdoTask);
router.delete('/api/todotask_delete/:id', TaskTodo.deleteTodotasks);
router.put('/api/todoupdate_status', TaskTodo.UpdateStatusTodoTask);
router.get('/api/todo_by_emp_unique_id/:emp_id', TaskTodo.todoTaskByuniqueid)



/////////////// Khata book name list //////////////////////////////////////////

router.get('/api/khatabook_list', KhataBook.khatabookList);
router.post('/api/add_khatabook', KhataBook.addKhataBook);
router.get('/api/khataamount_list/:khatanum', KhataBook.khataamountbyid);
router.delete('/api/delete_khatahisab/:id', KhataBook.deleteKhatahisab);
router.delete('/api/delete_khataCustomer/:id', KhataBook.deleteKhataCustomer);


/// khata amount update
router.post('/api/addamount_khatabook', KhataBook.addKhataBookAmount);
//////////////////////billl data...........


// router.get('/api/khatabook_list', billData.khatabookList);
router.post('/api/addbill_data', billData.addBill);
 router.get('/api/bill_list', billData.billList);
 router.delete('/api/delete_bill/:id', billData.deleteBill);
 router.put('/api/update_bill_info', billData.UpdatebillInfo);
 router.get('/api/count_list', billData.CountAllTable);

 

module.exports = router;
