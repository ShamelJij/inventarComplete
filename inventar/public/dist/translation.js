export class Translation {
  db = '';
  constructor(db) {
    this.db = db;
  }

  //--------------------------------------------------------------------------------
  /**
   * Translates and corrects input from user grammatically
   *
   */
  // Konvertieren von Eingaben in das richtige Format
  // Bsp Trim bei Textfeldern
  async inputTranslation() {
    if (this.db === 'inventories') {
      // "Bezeichnung", "Seriennummer", "Typ" die vorherigen und hinteren Leerzeichen entfernen
      //Bezeichnung
      let label = document.getElementById('inventoryLabel').value;

      label = label.replace(/\s+/g, ' ');
      label = label.trim();
      console.log('trimmed Bezeichnung: ', label);
      document.getElementById('inventoryLabel').value = label;
      //seriennummer
      let inventorySerialNumber = document.getElementById(
        'inventorySerialNumber'
      ).value;

      inventorySerialNumber = inventorySerialNumber.replace(/\s+/g, ' ');
      console.log('Serial Number after replace: ', inventorySerialNumber);
      inventorySerialNumber = inventorySerialNumber.trim();
      console.log('trimmed serial NUmber: ', inventorySerialNumber);

      document.getElementById('inventorySerialNumber').value =
        inventorySerialNumber;
      //typ
      let inventoryType = document.getElementById('inventoryType').value;
      console.log('trimmed Type: ', inventoryType);
      inventoryType = inventoryType.replace(/\s+/g, ' ');
      inventoryType = inventoryType.trim();
      console.log('result type: ', inventoryType);
      document.getElementById('inventoryType').value = inventoryType;
      // Formatieren des Preises im Format: x.xxx,xx
      let inventoryPriceInpt =
        document.getElementById('inventoryPriceInpt').value;
      let itemId = document.getElementById('inventoryId').value;

      if (inventoryPriceInpt <= 2000) {
        document.getElementById('inventoryBookingCategory').value = 'GWG';
        if (itemId == '') {
          //neue Datensatz
          //nichts machen
          document.getElementById('inventoryDepreciationInput').value = 0;
        } else {
          //vorhandener Datensatz
          //nichts machen
        }
        document.getElementById('inventoryDepreciationInput').value = 0;
      } else {
        document.getElementById('inventoryBookingCategory').value =
          'Abschreibfähig';
        if (itemId == '') {
          //neue Datensatz
          //nichts machen
          if (
            document.getElementById('inventoryDepreciationInput').value == ''
          ) {
            //bleibt leer
          } else {
            //
          }
        } else {
          //vorhandener Datensatz
          //nichts machen
        }
      }
    } else if (this.db === 'person') {
      //todo: translation for person
    } else if (this.db === 'locations') {
      //todo: translation for location
    }
  }
}
