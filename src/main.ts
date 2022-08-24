import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'Mgo+DSMBaFt/QHJqVVhjWlpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9jQXxRd0FhXntWcnFVQw==;Mgo+DSMBPh8sVXJ0S0R+XE9HcFRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xTfkdhWHtcd3BdRGZdVA==;ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdk1hW35acnNRTmJbUkE=;NzAxOTMwQDMyMzAyZTMyMmUzMGN5MGRnN3pUYmtkU2ZKalcxMUM2bTRNbXR2ZEpvYWN6UGV4ekVPNGVrQlU9;NzAxOTMxQDMyMzAyZTMyMmUzMGZnVVU5Mm1HRXkxY3ZULzlkbDhoanVnOWRiSkk1bHRSVGVjWVptSm5Db2s9;NRAiBiAaIQQuGjN/V0Z+Xk9EaFxEVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdEVrW31fdHZSQmhfVENz;NzAxOTMzQDMyMzAyZTMyMmUzMGV2ajJHVzIxcTN3VTlocENodldibGU1RmIwTlVlQUF3YmMvV2VuQkFBMWs9;NzAxOTM0QDMyMzAyZTMyMmUzMGFjUWkzTDZ5T3lUWHJtNHk1bE9ZTzNrSkpjbFNaaUlFV09rWnFSOFE3V1U9;Mgo+DSMBMAY9C3t2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdk1hW35acnNRTmReU0E=;NzAxOTM2QDMyMzAyZTMyMmUzMFpuNDFJbzBiSzBZWlV6Y0NRTWdrZVZvZUE5YWg1VTFpWkFLYm1jRE9pbFU9;NzAxOTM3QDMyMzAyZTMyMmUzMG5wRzQvcmwrMGFiY1BWQ1hEWDR1OUFjNVVuVEJKNmd6Zk4zc09tY055blk9;NzAxOTM4QDMyMzAyZTMyMmUzMGV2ajJHVzIxcTN3VTlocENodldibGU1RmIwTlVlQUF3YmMvV2VuQkFBMWs9'
);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
