var data = {
    session_info : {
        id : "",
        role : ""
    },
    user_data : {
        doctor : [
            {
                id : "doctor_1",
                name : "doctor 1",
                patients : ["patient_1","patient_2"]
            },
            {
                id : "doctor_2",
                name : "doctor 2",
                patients : ["patient_3"]
            },
            {
                id : "doctor_3",
                name : "doctor 3",
                patients : ["patient_1,patient_2,patient_3"]
            }
        ],
        pharmacist : [
            {
                id : "pharmacist_1",
                name : "pharmacist 1"
            },
            {
                id : "pharmacist_2",
                name : "pharmacist 2"
            },
            {
                id : "pharmacist_3",
                name : "pharmacist 3"
            }
        ],
        patient : [
            {
                id: "patient_1",
                name: "patient 1",
                prescriptions: [
                    {
                        id: 1,
                        prescription: "Prescription 1",
                        action : {
                            doctors : [
                                    {
                                    doctor_id : "doctor_1",
                                    status : ""
                                    },
                                    {
                                    doctor_id : "doctor_3",
                                    status : "approved"
                                    }
                                ],
                            pharmacist : [
                                    {
                                    pharmacist_id : "pharmacist_1",
                                    status : "pending"
                                    },
                                    {
                                    pharmacist_id : "pharmacist_3",
                                    status : "approved"
                                    }
                            ]
                        }
                        
                    },
                    {
                        id: 2,
                        prescription: "Prescription 2",
                        action : {
                            doctors : [
                                    {
                                    doctor_id : "doctor_1",
                                    status : "pending"
                                    },
                                    {
                                    doctor_id : "doctor_3",
                                    status : ""
                                    }
                                ],
                            pharmacist : [
                                {
                                    pharmacist_id : "pharmacist_1",
                                    status : "pending"
                                    },
                                    {
                                    pharmacist_id : "pharmacist_3",
                                    status : "pending"
                                    }
                            ]
                        }
                    },
                    {
                        id: 3,
                        prescription: "Prescription 3",
                        action : {
                            doctors : [
                                    {
                                    doctor_id : "doctor_1",
                                    status : "pending"
                                    },
                                    {
                                    doctor_id : "doctor_3",
                                    status : "approved"
                                    }
                                ],
                            pharmacist : [
                                {
                                    pharmacist_id : "pharmacist_1",
                                    status : "pending"
                                    },
                                    {
                                    pharmacist_id : "pharmacist_3",
                                    status : "approved"
                                    }
                            ]
                        }
                    }
                ]
            },
            {
                id: "patient_2",
                name: "patient 2",
                prescriptions: [
                    {
                        id: 1,
                        prescription: "Loreum Ipsum",
                        action : {
                            doctors : [
                                    {
                                    doctor_id : "doctor_1",
                                    status : "approved"
                                    },
                                    {
                                    doctor_id : "doctor_3",
                                    status : "approved"
                                    }
                                ],
                            pharmacist : [
                                {
                                    pharmacist_id : "pharmacist_1",
                                    status : "approved"
                                    },
                                    {
                                    pharmacist_id : "pharmacist_3",
                                    status : "approved"
                                    }
                            ]
                        }
                    }
                ]
            },
            {
                id: "patient_3",
                name: "patient 3",
                prescriptions: [
                    {
                        id: 1,
                        prescription: "Loreum Ipsum",
                        action : {
                            doctors : [
                                    {
                                    doctor_id : "doctor_2",
                                    status : "approved"
                                    },
                                    {
                                    doctor_id : "doctor_3",
                                    status : "pending"
                                    }
                                ],
                            pharmacist : [
                                {
                                    pharmacist_id : "pharmacist_1",
                                    status : "approved"
                                    },
                                    {
                                    pharmacist_id : "pharmacist_3",
                                    status : "pending"
                                    }
                            ]
                        }
                    }
                ]
            }
        ]
    }
}