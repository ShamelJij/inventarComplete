export class Validation {
  db = "";
  constructor(db) {
    this.db = db;
  }

  async inputValidation() {
    if (this.db === "inventories") {
      //################################################################################
      /**
       * input validation
       *
       * @return {boolean} ret
       */
      //variable for refresh function for the return
      let ret = true;
      //Anschaffungsdatum validieren (muss nicht in zukunft sein)
      //Anschaffungsdatum als wert
      let inventoryPurchaseDate = document.getElementById(
        "inventoryPurchaseDate"
      ).value;
      //jetztgen Datum
      let nowDate = new Date().toISOString().split("T")[0];

      console.log("purchase date is: ", Number(inventoryPurchaseDate));
      console.log("now is: ", nowDate);

      if (inventoryPurchaseDate > nowDate) {
        console.log("purchase date is bigger than now");
        let x = document.getElementById("inventoryPurchaseDate").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("inventoryPurchaseDate").className =
          x + " is-invalid";
        document.getElementById("inventoryPurchaseDateInvalid").innerText =
          "Das Datum legt in Zukunft!";
        ret = false;
      } else if (inventoryPurchaseDate == "") {
        let t = document.getElementById("inventoryPurchaseDate").className;
        t = t.replace("is-invalid", "");
        t = t.replace("is-valid", "");
        t = t.trim();
        document.getElementById("inventoryPurchaseDate").className =
          t + " is-invalid";
        document.getElementById("inventoryPurchaseDateInvalid").innerText =
          "Das Datum ist leer!";
        ret = false;
      } else {
        console.log("purchase date is smaller than now");
        let y = document.getElementById("inventoryPurchaseDate").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("inventoryPurchaseDate").className =
          y + " is-valid";
        document.getElementById("inventoryPurchaseDateValid").innerText =
          "Das Datum ist gültig!";
      }
      //price validation muss nicht negatives Wert haben
      let inventoryPrice = document.getElementById("inventoryPrice").value;
      //parsing input to number without zeros on the left
      inventoryPrice = Number(inventoryPrice);
      document.getElementById("inventoryPrice").value = inventoryPrice;
      console.log("the inventoryPrice is: ", inventoryPrice);

      //Show booking category
      if (inventoryPrice < 0) {
        console.log("inventoryPrice is negative");
        let x = document.getElementById("inventoryPrice").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("inventoryPrice").className = x + " is-invalid";
        document.getElementById("inventoryPriceNotValid").innerText =
          "Kein negativem Wert bitte!";
        ret = false;
      } else {
        console.log("inventoryPrice is not negative");
        let y = document.getElementById("inventoryPrice").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("inventoryPrice").className = y + " is-valid";
        document.getElementById("inventoryPriceValid").innerText =
          "Der Wert ist gültig!";
      }
      //deprecation validation inventoryDepreciationInput
      //deprecation validation muss nicht negatives Wert haben
      let inventoryDepreciationDate = document.getElementById(
        "inventoryDepreciationInput"
      ).value;
      inventoryDepreciationDate = Number(inventoryDepreciationDate);
      //Show booking category
      if (inventoryDepreciationDate < 0) {
        console.log("deprecation is negative");
        let x = document.getElementById("inventoryDepreciationInput").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("inventoryDepreciationInput").className =
          x + " is-invalid";
        document.getElementById(
          "inventoryDepreciationInputIsInValid"
        ).innerText = "Kein negativem Wert bitte!";
        ret = false;
      } else {
        //--------------------------------------------------------------------
        //if new booking category is depreciable (abschreibfähig)
        if (inventoryPrice <= 2000 && inventoryPrice >= 0) {
          document.getElementById("inventoryBookingCategory").value = "GWG";
          let inventoryOldStatus = document.getElementById(
            "inventoryHiddenStatus"
          ).value;
          let newStatus = document.getElementById(
            "inventoryBookingCategory"
          ).value;
          if (inventoryOldStatus != newStatus) {
            //inventoryBookingCategoryChanged Modal
            document.getElementById("newStatusModal").innerText = newStatus;
            $("#inventoryBookingCategoryChanged").modal("show");
            document.getElementById("inventoryHiddenStatus").value = newStatus;
          } else {
            let y = document.getElementById(
              "inventoryDepreciationInput"
            ).className;
            y = y.replace("is-invalid", "");
            y = y.replace("is-valid", "");
            y = y.trim();
            document.getElementById("inventoryDepreciationInput").className =
              y + " is-valid";
            document.getElementById(
              "inventoryDepreciationInputIsValid"
            ).innerText = "Der Wert ist gültig!";
          }
        } else {
          let inventoryOldStatus = document.getElementById(
            "inventoryHiddenStatus"
          ).value;
          let newStatus = document.getElementById(
            "inventoryBookingCategory"
          ).value;
          if (inventoryOldStatus != newStatus) {
            document.getElementById("newStatusModal").innerText = newStatus;
            if (newStatus == "Abschreibfähig") {
              document.getElementById("inventoryDepreciationGroup").className =
                "d-block";
              document.getElementById(
                "inventoryValidationEndDateGroup"
              ).className = "d-block";
              console.warn("success!!!");
              let x = document.getElementById(
                "inventoryDepreciationInput"
              ).className;
              x = x.replace("is-invalid", "");
              x = x.replace("is-valid", "");
              x = x.trim();
              document.getElementById("inventoryDepreciationInput").className =
                x + " is-invalid";
              document.getElementById(
                "inventoryDepreciationInputIsInValid"
              ).innerText = "bitte esrt anpassen dann Brechnen drücken!";
              ret = false;
            }
            $("#inventoryBookingCategoryChanged").modal("show");
            console.log("bookingcategory is changed!! Alert!!");
            document.getElementById("inventoryHiddenStatus").value = newStatus;
          } else {
            console.log("bookingcategory is not changed!! ALERT!");
            document.getElementById("inventoryDepreciationGroup").className =
              "d-none";
            document.getElementById(
              "inventoryValidationEndDateGroup"
            ).className = "d-none";
          }
        }
        //--------------------------------------------------------------------
      }
      //validating the label input not to be empty
      let labelInput = document.getElementById("inventoryLabel").value;
      if (labelInput == "") {
        let l = document.getElementById("inventoryLabel").className;
        l = l.replace("is-invalid", "");
        l = l.replace("is-valid", "");
        l = l.trim();
        document.getElementById("inventoryLabel").className = l + " is-invalid";
        document.getElementById("inventoryLabelIsInvalid").innerText = "leer!";
        //optional
        //ret = false;
      } else {
        let lv = document.getElementById("inventoryLabel").className;
        lv = lv.replace("is-invalid", "");
        lv = lv.replace("is-valid", "");
        lv = lv.trim();
        document.getElementById("inventoryLabel").className = lv + " is-valid";
        document.getElementById("inventoryLabelIsValid").innerText =
          "Eingabe ist gültig";
        console.log("labelInput is not empty");
        //optional
        //ret = true;
      }
      //validating the label input not to be empty
      let inventorySerialNumber = document.getElementById(
        "inventorySerialNumber"
      ).value;
      if (inventorySerialNumber == "") {
        let sn = document.getElementById("inventorySerialNumber").className;
        sn = sn.replace("is-invalid", "");
        sn = sn.replace("is-valid", "");
        sn = sn.trim();
        document.getElementById("inventorySerialNumber").className =
          sn + " is-invalid";
        document.getElementById("inventorySerialNumberIsInValid").innerText =
          "leer!";
        //optional
        //ret = false;
      } else {
        let snv = document.getElementById("inventorySerialNumber").className;
        snv = snv.replace("is-invalid", "");
        snv = snv.replace("is-valid", "");
        snv = snv.trim();
        document.getElementById("inventorySerialNumber").className =
          snv + " is-valid";
        document.getElementById("inventorySerialNumberIsValid").innerText =
          "Eingabe ist gültig";
        console.log("serialnumber is not empty");
        //optional
        //ret = true;
      }
      //validating the label input not to be empty
      let inventoryType = document.getElementById("inventoryType").value;
      if (inventoryType == "") {
        let it = document.getElementById("inventoryType").className;
        it = it.replace("is-invalid", "");
        it = it.replace("is-valid", "");
        it = it.trim();
        document.getElementById("inventoryType").className = it + " is-invalid";
        document.getElementById("inventoryTypeIsInValid").innerText = "leer!";
        //optional
        //ret = false;
      } else {
        let itv = document.getElementById("inventoryType").className;
        itv = itv.replace("is-invalid", "");
        itv = itv.replace("is-valid", "");
        itv = itv.trim();
        document.getElementById("inventoryType").className = itv + " is-valid";
        document.getElementById("inventoryTypeIsValid").innerText =
          "Eingabe ist gültig";
        console.log("Type is not empty");
        //optional
        //ret = true;
      }
      console.log("ret is: ", ret);
      return ret;
    } else if (db === "persons") {
      let ret = true;
      let personList = (await getPersons()) || [];
      let letters = /^[a-zA-Z]*$/;

      //Personal Nummer Validieren
      let personalNumber = getInputPerson().personPersonalNumber;
      let personEmail = getInputPerson().personEmail.replace(/ +/g, "");
      let l_name = getInputPerson().personLastName.replace(/ +/g, "");
      let f_name = getInputPerson().personFirstName.replace(/ +/g, "");
      const found_personal_number = personList.find(
        (element) =>
          element.personPersonalNumber == getInputPerson().personPersonalNumber
      );
      const found_personEmail = personList.find(
        (element) => element.personEmail == getInputPerson().personEmail
      );
      let is_personEmail = personEmail.match(
        /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g
      );
      if (found_personal_number) {
        let x = document.getElementById("personPersonalNumber").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("personPersonalNumber").className =
          x + " is-invalid";
        document.getElementById("personPersonalNumberIsInValid").innerText =
          "die Eingabe soll eindeutig sein!";
        ret = false;
      } else if (personalNumber == "" || personalNumber < 1) {
        let x = document.getElementById("personPersonalNumber").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("personPersonalNumber").className =
          x + " is-invalid";
        document.getElementById("personPersonalNumberIsInValid").innerText =
          "es soll eine Eingabe geben!";
        ret = false;
      } else {
        let y = document.getElementById("personPersonalNumber").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("personPersonalNumber").className =
          y + " is-valid";
      }
      // E-Mail validieren
      if (is_personEmail) {
        let y = document.getElementById("personEmail").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("personEmail").className = y + " is-valid";
        if (found_personEmail) {
          let x = document.getElementById("personEmail").className;
          x = x.replace("is-invalid", "");
          x = x.replace("is-valid", "");
          x = x.trim();
          document.getElementById("personEmail").className = x + " is-invalid";
          document.getElementById("personEmailIsInValid").innerText =
            "die Eingabe soll eindeutig sein!";
          ret = false;
        } else if (personEmail == "") {
          let x = document.getElementById("personEmail").className;
          x = x.replace("is-invalid", "");
          x = x.replace("is-valid", "");
          x = x.trim();
          document.getElementById("personEmail").className = x + " is-invalid";
          document.getElementById("personEmailIsInValid").innerText =
            "es soll eine Eingabe geben!";
          ret = false;
        } else {
          let y = document.getElementById("personEmail").className;
          y = y.replace("is-invalid", "");
          y = y.replace("is-valid", "");
          y = y.trim();
          document.getElementById("personEmail").className = y + " is-valid";
        }
      } else {
        let x = document.getElementById("personEmail").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("personEmail").className = x + " is-invalid";
        document.getElementById("personEmailIsInValid").innerText =
          "die Eingabe ist kein E-Mail!";
        ret = false;
      }
      //Name validieren
      if (l_name == "" || !letters.test(l_name)) {
        let x = document.getElementById("personLastName").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("personLastName").className = x + " is-invalid";
        document.getElementById("personLastNameIsInValid").innerText =
          "es soll eine Eingabe geben!";
        ret = false;
      } else {
        let y = document.getElementById("personLastName").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("personLastName").className = y + " is-valid";
      }
      //Vorname validieren
      if (f_name == "" || !letters.test(f_name)) {
        let x = document.getElementById("personFirstName").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("personFirstName").className =
          x + " is-invalid";
        document.getElementById("personFirstNameIsInValid").innerText =
          "Eingabe ist falsch!";
        ret = false;
      } else {
        let y = document.getElementById("personFirstName").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("personFirstName").className = y + " is-valid";
      }

      return ret;
    } else if (db === "locations") {
      let ret = true;
      let locationList = (await getLocations()) || [];
      let letters = /^[a-zA-Z]*$/;

      let locationBusinessName = getInputLocation().locationBusinessName;
      let locationStreetName = getInputLocation().locationStreetName;
      let locationHouseNumber = getInputLocation().locationHouseNumber;
      let locationZipcode = getInputLocation().locationZipcode;
      let locationAreaName = getInputLocation().locationAreaName;
      let locationFloorNumber = getInputLocation().locationFloorNumber;
      let locationRoomNumber = getInputLocation().locationRoomNumber;

      if (locationHouseNumber == "" || locationHouseNumber < 1) {
        let x = document.getElementById("locationHouseNumber").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("locationHouseNumber").className =
          x + " is-invalid";
        document.getElementById("houseNumberIsInValid").innerText =
          "es soll eine Eingabe geben!";
        ret = false;
      } else {
        let y = document.getElementById("locationHouseNumber").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("locationHouseNumber").className =
          y + " is-valid";
      }
      //Ort validieren
      if (locationAreaName == "" || !letters.test(locationAreaName)) {
        let x = document.getElementById("locationAreaName").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("locationAreaName").className =
          x + " is-invalid";
        document.getElementById("locationNameIsInValid").innerText =
          "es soll eine Eingabe geben!";
        ret = false;
      } else {
        let y = document.getElementById("locationAreaName").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("locationAreaName").className = y + " is-valid";
      }
      //strasse validieren
      if (locationStreetName == "" || !letters.test(locationStreetName)) {
        let x = document.getElementById("locationStreetName").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("locationStreetName").className =
          x + " is-invalid";
        document.getElementById("locationStreetIsInValid").innerText =
          "Eingabe ist falsch!";
        ret = false;
      } else {
        let y = document.getElementById("locationStreetName").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("locationStreetName").className =
          y + " is-valid";
      }

      return ret;
    }
  }
}
