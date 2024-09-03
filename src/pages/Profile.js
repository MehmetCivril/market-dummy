import axios from "axios"
import React, { useEffect } from "react"

// Profile bileşeni, kullanıcının profil sayfası için oluşturulmuş.
// Bileşen yüklendiğinde kullanıcı listesini almak için bir API isteği yapar.
function Profile() {
  // useEffect hook'u bileşen ilk yüklendiğinde çalışır ve getUserList fonksiyonunu çağırır.
  useEffect(() => {
    getUserList()
  }, [])

  // getUserList fonksiyonu, kullanıcı listesini almak için bir API isteği gönderir.
  const getUserList = () => {
    // Tarayıcıda localStorage'dan 'access_token' anahtarı ile kaydedilmiş JWT token'ı alır.
    let token = localStorage.getItem("access_token")

    // Eğer token yoksa, kullanıcının oturum açmadığı varsayılır ve fonksiyon null döndürerek sonlanır.
    if (!token) {
      return null
    }

    // API isteği için gerekli olan Authorization başlığı (header) oluşturulur.
    let headers = {
      Authorization: token, // Token 'Authorization' başlığına eklenir.
    }

    // Axios kullanarak kullanıcı listesini almak için bir GET isteği yapılır.
    axios
      .get("http://localhost:9000/user/getAll", { headers }) // URL ve başlıklar (headers) belirtilir.
      .then((res) => console.log(res)) // İstek başarılı olduğunda sunucudan dönen yanıtı (response) konsola yazdırır.
      .catch((err) => console.log(err)) // İstek başarısız olursa hatayı (error) konsola yazdırır.
  }

  return <div>Profile</div>
}

export default Profile
