import { createStore } from 'vuex'
// Googleプロバイダーをimport
import { GoogleAuthProvider } from "firebase/auth";
// Google認証機能、サインアウトをimport
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
// firestoreをimport
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default createStore({
  state: {
    login_user: null,
    // sideNavの状態
    sideNav: false,
    // taskを入れる箱 {title: 'hoge', start: '00:00', end: ''}
    tasks: []
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : '',
    // パラメーター(FormView.vue)から受け取ったidに一致するtaskオブジェクトを参照
    getAddressById: state => id => state.tasks.find( task => task.id === id)
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    // アプリ側のログアウト
    deleteLoginUser(state) {
      state.login_user = null
    },
    // stateのsideNavの状態を切り替え
    toggleSideNav(state) {
      state.sideNav = !state.sideNav
    },
    addTask(state, { id, task }) {
      // taskオブジェクトにidを追加
      task.id = id
      // task.name = "H_Fujii" など可能
      state.tasks.push(task)
    },
    updateTask(state, { id, task }) {
      // tasksの中からパラメーターと一致するtaskオブジェクトのindexを取得
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks[index] = task
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(task => task.id === id)
      // splice 削除する個数を指定
      state.tasks.splice(index, 1)
    }
  },
  // actionsに行ってから mutation に指示を出す
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
      // console.log("test");
    },
    // アプリ側のログアウト
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithRedirect(auth, provider);
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // ページをリロードする
        location.reload();
        // トップページへ遷移
        window.location.href = '/';
      }).catch((error) => {
        console.log(error);
      })
    },
    // toggleSideNavのクリックイベントがmapActionsで呼び出されたら実行
    // commitメソッドでmutationsのtoggleSideNavを発火
    toggleSideNav({ commit }) {
      commit('toggleSideNav')
    },

    async addTask({ getters, commit }, task) {
      // firestoreに接続 dbに省略定義
      const db = getFirestore();
      try {
        if(getters.uid) {
          // firestoreにデータを追加
          const docRef = await addDoc(collection(db, `users/${getters.uid}/tasks`), task);
          console.log("Document written with ID: ", docRef.id);
          commit('addTask', { id: docRef.id, task })
        } else {
          // ログインしていないときもtaskを追加できるように
          commit('addTask',{id: '', task})
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async fetchTasks({ getters, commit }) {
      const db = getFirestore();
      // firestoreからコレクションの中身を取得
      const querySnapshot = await getDocs(collection(db, `users/${getters.uid}/tasks`));
      querySnapshot.forEach((doc) => {
        // docの中身にidが格納されている。console.logで確認できる。
        commit('addTask', { id: doc.id, task: doc.data() })
        console.log(`${doc.id} => ${doc.data()}`);
      });
    },
    async updateTask({ getters, commit }, { id, task }) {
      const db = getFirestore();
      // 編集するドキュメントを参照
      const editTask = doc(db, `users/${getters.uid}/tasks`, id);
      console.log(editTask);
      await updateDoc(editTask, {
        title: task.title,
        start: task.start,
        end: task.end
      });
      commit('updateTask',{ id, task })
    },
    async deleteTask({ getters, commit }, id) {
      const db = getFirestore();
      await deleteDoc(doc(db, `users/${getters.uid}/tasks`, id));
      commit('deleteTask', id)
    }
  },
  modules: {
  }
})
