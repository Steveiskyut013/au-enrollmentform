// ---------- ADDRESS HANDLING WITH SELECT2 ----------
let addressData = {}; // Philippines JSON

// Load Philippines JSON
fetch('philippines_full.json')
  .then(res => res.json())
  .then(data => {
    addressData = data;
    initAddressSelects();
  })
  .catch(err => console.error("Failed to load Philippines JSON", err));

function initAddressSelects(){
    // Initialize Select2
    $('#province').select2({ placeholder: "Select Province" });
    $('#city').select2({ placeholder: "Select City / Municipality" });
    $('#barangay').select2({ placeholder: "Select Barangay" });

    loadProvinces();
}

// Load Provinces
function loadProvinces(){
    const provSelect = $('#province');
    provSelect.empty().append('<option value=""></option>');
    Object.keys(addressData).forEach(p => provSelect.append(`<option value="${p}">${p}</option>`));
    provSelect.val(null).trigger('change');

    $('#city').empty().append('<option value=""></option>').val(null).trigger('change');
    $('#barangay').empty().append('<option value=""></option>').val(null).trigger('change');
    $('#zip').val('');
}

// When Province changes → Load Cities
$('#province').on('change', function(){
    const prov = $(this).val();
    const citySelect = $('#city').empty().append('<option value=""></option>');
    const barangaySelect = $('#barangay').empty().append('<option value=""></option>');
    $('#zip').val('');

    if(prov && addressData[prov]){
        Object.keys(addressData[prov]).forEach(c => citySelect.append(`<option value="${c}">${c}</option>`));
    }

    citySelect.val(null).trigger('change');
    barangaySelect.val(null).trigger('change');
});

// When City changes → Load Barangays
$('#city').on('change', function(){
    const prov = $('#province').val();
    const city = $(this).val();
    const barangaySelect = $('#barangay').empty().append('<option value=""></option>');
    $('#zip').val('');

    if(prov && city && addressData[prov][city]){
        Object.keys(addressData[prov][city]).forEach(b => barangaySelect.append(`<option value="${b}">${b}</option>`));
    }

    barangaySelect.val(null).trigger('change');
});

// When Barangay changes → Load ZIP
$('#barangay').on('change', function(){
    const prov = $('#province').val();
    const city = $('#city').val();
    const barangay = $(this).val();

    if(prov && city && barangay && addressData[prov][city][barangay]){
        $('#zip').val(addressData[prov][city][barangay]);
    } else {
        $('#zip').val('');
    }
});

