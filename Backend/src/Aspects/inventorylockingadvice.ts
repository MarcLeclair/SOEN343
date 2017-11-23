import { AdvicePool } from 'kaop-ts';
import { Inventory } from '../Models/inventory';
import { Catalog } from '../catalog';

export class InventoryLockingAdvice extends AdvicePool {
	private static lockedFor = 60 * 10 * 1000;

	static requireUnlocked(serialNumber) {
		let currInventory: Inventory = InventoryLockingAdvice.findInventory(serialNumber);

		if (currInventory != null) {
			console.log("requireUnlocked: ");
			console.log(currInventory);

			if (!currInventory.isLocked()) {
				this.next();
			} else {
				this.stop();
				this.next();
			}
		} else {
			this.stop();
			this.next();
		}
	}

	static ensureLocked(serialNumber) {
		let currInventory: Inventory = InventoryLockingAdvice.findInventory(serialNumber);
		currInventory.setLockedUntil(new Date(new Date().getTime() + InventoryLockingAdvice.lockedFor));
	}

	static ensureUnlocked(serialNumber) {
		let currInventory: Inventory = InventoryLockingAdvice.findInventory(serialNumber);
		currInventory.setLockedUntil(null);
	}

	private static findInventory(serialNumber): Inventory {
		let inventories: Inventory[] = Catalog.getInstance().inventories;

		for (let inventory of inventories) {
			if (inventory.getserialNumber() == serialNumber) {
				return inventory;
			}
		}

		return null;
	}
}