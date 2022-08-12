
export class MyAlert{
constructor(htmlId, obj, itemName){
            let x = htmlId.className
            x = x.replace('d-block','');
            x = x.replace('d-none','');
            x = x.trim();
            htmlId.className = x + ' d-block';
    itemName.innerText = obj.label + ' ' + obj.inventorytype;
    $('#' + htmlId).show();

    //initInventory();
            setTimeout(function () {

                // Closing the alert
                $('#' + htmlId).hide();
                htmlId.className = x + ' d-none';
            }, 4000);
    }

}