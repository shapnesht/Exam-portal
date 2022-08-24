import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateCategoriesComponent } from './pages/admin/update-categories/update-categories.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShowQuizzesComponent } from './pages/user/show-quizzes/show-quizzes.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full",
  },
  {
    path:"admin",
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:"profile",
        component:ProfileComponent,
      },
      {
        path:"",
        component:WelcomeComponent,
      },
      {
        path:"categories",
        component:ViewCategoriesComponent
      },
      {
        path:"add-category",
        component:AddCategoryComponent
      },
      {
        path:"quizzes",
        component:ViewQuizzesComponent
      },
      {
        path:"add-quiz",
        component:AddQuizComponent
      },
      {
        path:"update-quiz",
        component:UpdateQuizComponent
      },
      {
        path:"quiz/:quizId",
        component:UpdateQuizComponent
      },
      {
        path:"category/:categoryId",
        component:UpdateCategoriesComponent
      },
      {
        path:"view-questions/:quizId/:quizTitle",
        component:ViewQuizQuestionsComponent
      },
      {
        path:"add-question/:quizId",
        component:AddQuestionComponent
      },
      {
        path:"update-question/:quizId/:questionId",
        component:UpdateQuestionComponent
      }
    ]
  },
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:"",
        component: WelcomeUserComponent
      },
      {
        path:":categoryId",
        component:ShowQuizzesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
