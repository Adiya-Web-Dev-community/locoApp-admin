export interface subcategory {
    _id: string;
    name: string;
    subSubCategories: [subSubCategories]
}
export interface subSubCategories {
    _id: string;
    name: string;
    innerCategories: [innerCategories]
}
export interface innerCategories {
    _id: string;
    name: string;
}
export interface BlogCategory {
    _id: string;
    name: string;
    subCategories: [subcategory]
}

interface blogsubcat {
    _id: string;
    name: string;
    blogs: BlogSTyepes[];
    subSubCategories: [blogssubsub]
}
interface blogssubsub {
    _id: string;
    name: string;
    blogs: BlogSTyepes[];
    innerCategories: [bloginner]
}
interface bloginner {
    _id: string;
    name: string;
    blogs: BlogSTyepes[];
}
export interface BlogSTyepes {
    _id:string;
    title: string;
    slug: string;
    thumnail: string;
    content: string;
    updatedAt:string;
    createdAt:string;
}
export interface BlogWithCategory {
    _id: string;
    name: string;
    subCategories: [blogsubcat]
    blogs: BlogSTyepes[];
}

export interface VideoCategorys{
    _id:string;
    category:string;
}

export interface videosTypes{
    _id:string;
    title:string;
    slug:string;
    category:string;
    url:string;
    tags:string;
    dectription:string;
    updatedAt:string;
    createdAt:string;
}

export interface UserTypes{
    _id:string;
    image:string;
    name:string;
    mobile:number;
    email:string;
    createdAt:string;
    role:string;
    isVerify:boolean;

}

export interface AwarenessType {
    _id: string;
    title: string;
    category: string;
    createdAt: string;
    image: string;
  }

  export interface ImpLinkDocs{
    _id:string,
    title:string,
    donwloadable:string,
    createdAt: string;
  }