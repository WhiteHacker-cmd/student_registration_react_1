import http from "../http-common";

class StudentRegistrationDataService{
    getAllStudentData(){
        return http.get("/students")
    }

    create(data){
        return http.post("/student", data)
    }
}

export default new StudentRegistrationDataService();