export const logic = {
    sex : {
        nam : {
            nam : 1,
            nu : 0
        },
        nu : {
            nam : 0,
            nu : 1
        }
    },
    ielts : {
        k : {
            k : 1,
            "6-7" : 0,
            "7-8" : 0,
            "8+" : 0
        },
        "6-7" : {
            k : 0,
            "6-7" : 1,
            "7-8" : 0.6,
            "8+" : 0.3
        },
        "7-8" : {
            k : 0,
            "6-7" : 0.7,
            "7-8" : 1,
            "8+" : 0.5
        },
        "8+" : {
            k : 0,
            "6-7" : 0.3,
            "7-8" : 0.8,
            "8+" : 1
        }
    },
    level : {
        dai_hoc : {
            dai_hoc : 1,
            cao_dang : 0.5
        },
        cao_dang : {
            dai_hoc : 0.4,
            cao_dang : 1
        }
    },
    specialized : {
        marketing : {
            marketing : 1,
            kinhte_quantri : 0.5,
            CNTT : 0.3,
            truyen_thong :0.7,
            vantai_dulich : 0.3
        },
        kinhte_quantri : {
            marketing : 1,
            kinhte_quantri : 0.5,
            CNTT : 0.3,
            truyen_thong :0.7,
            vantai_dulich : 0.3
        },
        CNTT : {
            marketing : 0.6,
            kinhte_quantri : 0.4,
            CNTT : 1,
            truyen_thong :0.6,
            vantai_dulich : 0.3
        },
        truyen_thong : {
            marketing : 0.7,
            kinhte_quantri : 0.4,
            CNTT : 0.3,
            truyen_thong :1,
            vantai_dulich : 0.4
        },
        vantai_dulich : {
            marketing : 0.5,
            kinhte_quantri : 0.4,
            CNTT : 0.3,
            truyen_thong :0.4,
            vantai_dulich : 0.1
        }
    },
    degree : {
        gioi : {
            gioi : 1,
            kha : 0.6,
            trung_binh : 0
        },
        kha : {
            gioi : 0.4,
            kha : 1,
            trung_binh : 0.5
        },
        trung_binh : {
            gioi : 0,
            kha : 0.4,
            trung_binh : 1
        }
    },
    communicate : {
        1 : {
            1 : 1,
            2 : 0.6,
            3 : 0.3 ,
            4 : 0
        },
        2 : {
            1 : 0.5,
            2 : 1,
            3 : 0.6 ,
            4 : 0.3
        },
        3 : {
            1 : 0.2,
            2 : 0.5,
            3 : 1 ,
            4 : 0.6
        },
        4: {
            1 : 0,
            2 : 0.2,
            3 : 0.6,
            4 : 1
        },
        0 : {
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0
        }
    },
    work_grops : {
        1 : {
            1 : 1,
            2 : 0.6,
            3 : 0.3 ,
            4 : 0
        },
        2 : {
            1 : 0.5,
            2 : 1,
            3 : 0.6 ,
            4 : 0.3
        },
        3 : {
            1 : 0.2,
            2 : 0.5,
            3 : 1 ,
            4 : 0.6
        },
        4: {
            1 : 0,
            2 : 0.2,
            3 : 0.6,
            4 : 1
        },
        0 : {
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0
        }
    },
    leader : {
        1 : {
            1 : 1,
            2 : 0.6,
            3 : 0.3 ,
            4 : 0
        },
        2 : {
            1 : 0.5,
            2 : 1,
            3 : 0.6 ,
            4 : 0.3
        },
        3 : {
            1 : 0.2,
            2 : 0.5,
            3 : 1 ,
            4 : 0.6
        },
        4: {
            1 : 0,
            2 : 0.2,
            3 : 0.6,
            4 : 1
        },
        0 : {
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0
        }
    },
    presentation : {
        1 : {
            1 : 1,
            2 : 0.6,
            3 : 0.3 ,
            4 : 0
        },
        2 : {
            1 : 0.5,
            2 : 1,
            3 : 0.6 ,
            4 : 0.3
        },
        3 : {
            1 : 0.2,
            2 : 0.5,
            3 : 1 ,
            4 : 0.6
        },
        4: {
            1 : 0,
            2 : 0.2,
            3 : 0.6,
            4 : 1
        },
        0 : {
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0
        }
    }
}