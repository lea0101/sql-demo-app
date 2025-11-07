// Patients (id, name, date_of_birth, cell_phone, city)
export class Patient {
    id?: any;
    name?: string;
    date_of_birth?: Date;
    cell_phone?: string;
    city?: string;
}

// Physicians (id, name, cell_phone, specialty)
export class Physician {
    id?: any;
    name?: string;
    cell_phone?: string;
    specialty?: string;
}


// Appointments (id, physician_id, patient_id, room_id, datetime, purpose)
export class Appointment {
    appt_id?: any;
    physician_name?: any;
    patient_name?: any;
    room_id?: any;
    appt_date?: Date;
    purpose?: any;
}

// Room
export class Room {
    id?: any;
    room_type?: string;
}