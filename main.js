const newMessageButtonSelector = "[data-testid='sidebar:compose']";
const fromAddressSelector = "[data-testid='composer:from']";
const addressListSelector = "[data-testid='select-list']";
const sendButtonSelector = "[data-testid='composer:send-button']";

var changedFromAddress = false

function updateFromAddressLabel(label) {
	document.querySelector(fromAddressSelector).children[0].children[0].children[0].innerHTML = label;
}


async function addListeners(){
	// Wait until the "New message" button acutally exists in the side bar
	while(document.querySelector(newMessageButtonSelector) == null) {
		await new Promise(r => setTimeout(r, 250));
	}
	
	// Overwrite the empty existing onclick function (all official ProtonMail actions appear to be done through a different method)
	document.querySelector(newMessageButtonSelector).onclick = async function() {	
	
		changedFromAddress = false;
			
		// Wait for the From Address selector box to exist
		while(document.querySelector(fromAddressSelector) == null) {
			await new Promise(r => setTimeout(r, 250));
		}
		
		document.querySelector(sendButtonSelector).disabled = true;
		updateFromAddressLabel("Change Me");
		
		// Overwrite the empy onclick function for the From Address Selector
		document.querySelector(fromAddressSelector).onclick = async function(){
			
			// Once the address has been changed once, don't need to add all this again
			if(!changedFromAddress) {

				// Wait for the whole dropdown list to exist before we edit them
				while(document.querySelector(addressListSelector) == null) {
					await new Promise(r => setTimeout(r, 250));
				}
				
				// Create a dummy fillerElement so the original first address can still be selected
				const addressList = document.querySelector(addressListSelector);
				const firstChild = addressList.children[0];
				
				var fillerElement = firstChild.cloneNode(true);
				fillerElement.children[0].children[0].children[0].innerHTML = "";
				
				// Remove highlight from the original first element
				firstChild.children[0].classList.remove("dropdown-item--is-selected");
				// This doesn't seem to be working right away, but takes away the less obvious active highlight eventually
				firstChild.children[0].classList.remove("active");
				
				// When the original first address is clicked, update the From Address label
				firstChild.onclick = function() {
					updateFromAddressLabel(firstChild.children[0].children[0].children[0].innerHTML);
				}
				
				addressList.insertBefore(fillerElement, firstChild);
				
				// Once a From Address is chosen, reenable the send button and set changedFromAddress to true so we don't do this again until the next email.
				addressList.onclick = function() {
					document.querySelector("[data-testid='composer:send-button']").disabled = false;
					changedFromAddress = true
				}
			}
		}
	
	}
}
addListeners();